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

// Generates dataset for a pie chart: Distribution of contributions by nation.
export function generateByNation(contributionList: Lore[]): DataSet {
  const nations: { [key: string]: number } = {};

  contributionList.forEach((contribution) => {
      if (contribution.nation) {
          if (!nations[contribution.nation]) {
              nations[contribution.nation] = 0;
          }
          nations[contribution.nation] += 1;
      }
  });

  return {
      labels: Object.keys(nations),
      datasets: [
          {
              values: Object.values(nations),
          }
      ]
  };
}

// Generates dataset for a line chart: Contributions over time (by book number).
export function generateOverTime(contributionList: Lore[]): DataSet {
  const contributionsByBook: number[] = [0, 0, 0];

  contributionList.forEach((contribution) => {
      if (contribution.bookno >= 1 && contribution.bookno <= 3) {
          contributionsByBook[contribution.bookno - 1] += 1;
      }
  });

  return {
      labels: ["Book 1", "Book 2", "Book 3"],
      datasets: [
          {
              values: contributionsByBook,
          }
      ]
  };
}

// Generates dataset for a donut chart: Contributions per character.
export function generateByCharacter(contributionList: Lore[]): DataSet {
  const characters: { [key: string]: number } = {};

  contributionList.forEach((contribution) => {
      const charName = typeof contribution.charactersinv === "string" ? contribution.charactersinv : contribution.charactersinv.name;
      if (charName) {
          if (!characters[charName]) {
              characters[charName] = 0;
          }
          characters[charName] += 1;
      }
  });

  return {
      labels: Object.keys(characters),
      datasets: [
          {
              values: Object.values(characters),
          }
      ]
  };
}


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
  };