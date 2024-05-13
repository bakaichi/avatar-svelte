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
};


export function determineNation(lat: number, lng: number): string {
    // Fire Nation
    if (-30 <= lat && lat <= 30 && -130 <= lng && lng <= -60) {
      return "Fire Nation";
    }
  
    // Northern Water Tribe
    if (70 <= lat && lat <= 90 && 0 <= lng && lng <= 20) {
      return "Water Tribes";
    }
  
    // Southern Water Tribe
    if (-90 <= lat && lat <= -70 && -20 <= lng && lng <= 20) {
      return "Water Tribes";
    }
  
    // Northern Air Temple
    if (70 <= lat && lat <= 80 && 30 <= lng && lng <= 60) {
      return "Air Nomads";
    }
  
    // Western Air Temple (The White Mountains)
    if (55 <= lat && lat <= 70 && -80 <= lng && lng <= -50) {
      return "Air Nomads";
    }
  
    // Southern Air Temple
    if (-70 <= lat && lat <= -60 && -40 <= lng && lng <= -10) {
      return "Air Nomads";
    }
  
    // Eastern Air Temple
    if (-40 <= lat && lat <= -20 && 140 <= lng && lng <= 160) {
      return "Air Nomads";
    }
  
    // Default to Earth Kingdom
    else {
      return "Earth Kingdom";
    }
  }