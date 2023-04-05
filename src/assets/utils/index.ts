export function dateToString(date: Date): string {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${day}/${month}/${year}`;
}

export function stringToDate(string: string): Date {
	return new Date(`${string.split("/")[1]}/${string.split("/")[0]}/${string.split("/")[2]}`);
}
