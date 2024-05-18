<script lang="ts">
  import { onMount } from "svelte";
  export let images: string[] = [];
  let slideIndex = 0;

  function showSlides(n: number) {
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "flex"; 
  }

  function nextSlide() {
    showSlides(slideIndex += 1);
  }

  function previousSlide() {
    showSlides(slideIndex -= 1);
  }

  function handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (event.currentTarget === document.getElementById('prev')) {
        previousSlide();
      } else if (event.currentTarget === document.getElementById('next')) {
        nextSlide();
      }
    }
  }

  onMount(() => {
    showSlides(slideIndex);
  });
</script>

<style>
  .slideshow-container {
    position: relative;
    max-width: 100%;
    margin: auto;
    height: 500px; /* height for the container */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #313131; /* container bg color */
    overflow: hidden;
    margin-bottom: 10vh;
  }

  .mySlides {
    display: none;
    justify-content: center;
    align-items: center; 
    height: 100%; 
    width: 100%; 
  }

  .mySlides img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain; 
  }

  .prev, .next {
    cursor: pointer;
    position: absolute;
    top: 50%;
    width: auto;
    padding: 16px;
    margin-top: -22px;
    color: white;
    font-weight: bold;
    font-size: 18px;
    transition: 0.6s ease;
    border-radius: 0 3px 3px 0;
    user-select: none;
    background-color: rgba(0,0,0,0.8);
  }

  .next {
    right: 0;
    border-radius: 3px 0 0 3px;
  }

  .prev {
    left: 0;
    border-radius: 3px 0 0 3px;
  }

  .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
  }
</style>

<div class="slideshow-container">
  {#each images as image, i}
    <div class="mySlides fade">
      <img src={image} alt={`Slide ${i + 1}`}>
    </div>
  {/each}

  <button id="prev" class="prev" on:click={previousSlide} on:keydown={handleKey} aria-label="Previous slide">&#10094;</button>
  <button id="next" class="next" on:click={nextSlide} on:keydown={handleKey} aria-label="Next slide">&#10095;</button>
</div>
