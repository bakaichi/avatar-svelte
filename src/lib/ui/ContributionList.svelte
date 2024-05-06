<script lang="ts">
    export let contributions = [
      {
        bookno: 1,
        characters: "Lisa",
        lat: "52.161290",
        lng: "-7.51540",
        lore: "A brilliant strategist and a compassionate leader.",
        contributor: "bart@simpson.com"
      },
      {
        bookno: 3,
        characters: "Maggie",
        lat: "52.261290",
        lng: "-7.231540",
        lore: "Known for her silent but witty demeanor.",
        contributor: "marge@simpson.com"
      },
      {
        bookno: 2,
        characters: "Ned",
        lat: "52.361290",
        lng: "-7.241540",
        lore: "The kindest neighbor in the town.",
        contributor: "homer@simpson.com"
      }
    ];
  </script>

<table class="table is-fullwidth">
    <thead>
      <th>Book Number</th>
      <th>Characters</th>
      <th>Latitude</th>
      <th>Longitude</th>
      <th>Lore</th>
      <th>Contributor</th>
    </thead>
    <tbody>
      {#each contributions as contribution}
        <tr>
          <td>{contribution.bookno}</td>
          <td>{contribution.characters}</td>
          <td>{contribution.lat}</td>
          <td>{contribution.lng}</td>
          <td>{contribution.lore}</td>
          <td>{contribution.contributor}</td>
        </tr>
      {/each}
    </tbody>
  </table>