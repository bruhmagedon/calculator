package service

import (
	"restApiCalc/service/models"
)

func Calc(exp models.InExp) any {
	switch exp.Symbol {
	case "-":
		return exp.FirstNum - exp.SecondNum
	case "+":
		return exp.FirstNum + exp.SecondNum
	case "*":
		return exp.FirstNum * exp.SecondNum
	case "%":
		return exp.FirstNum / exp.SecondNum
	case "!":
		return fac(exp.FirstNum)
	default:
		return "fail"
	}
}

func fac(num int) int {
	if num == 0 {
		return 1
	}
	return num * fac(num-1)
}
