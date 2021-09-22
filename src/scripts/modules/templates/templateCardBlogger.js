const templateCardBlogger = (blogger) => (`<li class="bloggers-list__blogger-item bloger-item-js">
<a
  class="bloggers-list__blogger-link blogger-link cursor-pointer-js cursor--pointer no-cursor"
  href="${blogger.url}"
>
  <article class="blogger-link__article">
    <img class="blogger-link__img" src="${blogger.img}" alt="${blogger.name}">

    <div class="blogger-link__wrap-description">
      <h3 class="blogger-link__title">${blogger.name}</h3>

      <ul class="blogger-link__subscribers subscribers">
        <li class="subscribers__item">
          <img class="subscribers__img" src="img/icon-fill-youtube.svg" alt="ютуб">

          <span class="subscribers__text" aria-label="Более 3160000 подписчиков">${blogger.subscribers.youtube}+</span>
        </li>

        <li class="subscribers__item">
          <img class="subscribers__img" src="img/icon-fill-vk.svg" alt="вконтакте">

          <span class="subscribers__text" aria-label="Более 134000 подписчиков">${blogger.subscribers.vk}+</span>
        </li>

        <li class="subscribers__item">
          <img class="subscribers__img" src="img/icon-fill-instagram.svg" alt="инстаграм">

          <span class="subscribers__text" aria-label="Более 128000 подписчиков">${blogger.subscribers.instagram}+</span>
        </li>
      </ul>
    </div>
  </article>
</a>
</li>`);

export default templateCardBlogger;
