package middleware

import (
	"context"
	"encoding/json"
	Dto "foodways/Dto/Result"
	jwtToken "foodways/Pkg/Jwt"
	"net/http"
	"strings"
)

type Result struct {
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

func Auth(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		token := r.Header.Get("Authorization")

		if token == "" {
			w.WriteHeader(http.StatusUnauthorized)
			response := Dto.ErrorResult{Code: http.StatusUnauthorized, Message: "unauthorized"}
			json.NewEncoder(w).Encode(response)
			return
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwtToken.DecodeToken(token)

		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			response := Result{Code: http.StatusUnauthorized, Message: "unauthorized"}
			json.NewEncoder(w).Encode(response)
			return
		}

		ctx := context.WithValue(r.Context(), "userInfo", claims)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
