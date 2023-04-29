const cards = document.querySelectorAll(".homepage");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const intersecting = entry.isIntersecting;
        entry.target.classList.toggle("show", intersecting);
        if(intersecting) observer.unobserve(entry.target);
      })
    }, { threshold: 0.6 });
    cards.forEach(card => {
      observer.observe(card);
    });

   // console.log("running...")