package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"restApiCalc/service"
	"restApiCalc/service/models"
)

func CalcHandler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if (*r).Method == http.MethodOptions {
			w.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Add("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
			w.Header().Add("Access-Control-Allow-Headers", "Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,x-referer")
			return;
		}
		var expression models.InExp
		if err := json.NewDecoder(r.Body).Decode(&expression); err != nil {
			log.Println(err)
		}

		mathResult := service.Calc(expression)
		
		w.Header().Add("Content-Type", "application/json")
		w.Header().Add("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Add("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
		w.Header().Add("Access-Control-Allow-Headers", "Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since,x-referer")

		if err := json.NewEncoder(w).Encode(models.OutExp{
			//Expression: fmt.Sprintf("%v %s %v", expression.FirstNum, expression.Symbol, expression.SecondNum),
			Result: mathResult.(int),
		}); err != nil {
			log.Println(err)
		}
		log.Printf("Success expression calculated. Expression: %s. Result: %d", expression, mathResult)
	}
}
