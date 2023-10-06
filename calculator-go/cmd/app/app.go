package app

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"os"
	"os/signal"
	"restApiCalc/api"
)

func Start() {
	router := mux.NewRouter()

	server := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	api.RegisterHandlers(router)

	go func() {
		if err := server.ListenAndServe(); err != nil {
			panic(err)
		}
	}()
	log.Println("Server running")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	<-quit

	log.Println("Server stopped")
}
