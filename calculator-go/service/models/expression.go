package models

type InExp struct {
	FirstNum  int    `json:"FirstNum"`
	SecondNum int    `json:"SecondNum"`
	Symbol    string `json:"Symbol"`
}

type OutExp struct {
	Expression string `json:"Expression"`
	Result     int    `json:"Result"`
}
