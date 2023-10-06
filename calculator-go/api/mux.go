package api

import (
	"github.com/gorilla/mux"
	"net/http"
	"restApiCalc/api/handlers"
)

func RegisterHandlers(router *mux.Router) {
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello User"))
	})
	router.HandleFunc("/calc", handlers.CalcHandler()).Methods(http.MethodPost, http.MethodOptions)
}
