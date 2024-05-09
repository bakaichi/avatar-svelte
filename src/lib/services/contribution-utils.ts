import type { DataSet, Lore } from "$lib/types/contribution-types";

export function generateByBook(contributionList: Lore[]): DataSet {
    const totalByBook: DataSet = {
        labels: ["Book 1", "Book 2", "Book 3"],  
        datasets: [
            {
                values: [0, 0, 0]  
            }
        ]
    };

    contributionList.forEach((contribution) => {
        if (contribution.bookno && contribution.bookno >= 1 && contribution.bookno <= 3) {
            totalByBook.datasets[0].values[contribution.bookno - 1] += 1;  // Increment the count at the index corresponding to the book number - 1
        }
    });

    return totalByBook;
}