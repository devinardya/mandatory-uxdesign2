import { BehaviorSubject } from 'rxjs';

export const playedGames$ = new BehaviorSubject(parseInt(localStorage.getItem('games') || 0));

export function updatePlayedGames(game) {
	 if (game) {
		localStorage.setItem('games',game);
	} else {
		localStorage.removeItem('games');
	} 
	playedGames$.next(game);
}

export const correctAnswers$ = new BehaviorSubject(parseInt(localStorage.getItem('correctAnswers') || 0));

export function updateCorrectAnswersStat(corrAns) {
	 if (corrAns) {
		localStorage.setItem('correctAnswers', corrAns);
	} else {
		localStorage.removeItem('correctAnswers');
	} 
	correctAnswers$.next(corrAns);
}

export const incorrectAnswers$ = new BehaviorSubject(parseInt(localStorage.getItem('incorrectAnswers') || 0));

export function updateIncorrectAnswersStat(incorrAns) {
	 if (incorrAns) {
         //console.log(incorrAns);
		localStorage.setItem('incorrectAnswers', incorrAns);
	} else {
		localStorage.removeItem('incorrectAnswers');
	} 
	incorrectAnswers$.next(incorrAns);
}

export const correctPercentage$ = new BehaviorSubject(localStorage.getItem('correctPercent') || 0);

export function updateCorrectPercentage(corrPercent) {
	 if (corrPercent) {
		localStorage.setItem('correctPercent', corrPercent);
	} else {
		localStorage.removeItem('correctPercent');
	} 
	correctPercentage$.next(corrPercent);
}