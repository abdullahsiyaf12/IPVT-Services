// ===== FAQ ACCORDION =====
const faqQuestions = document.querySelectorAll(".ans-ques h4");

if (faqQuestions.length > 0) {
  faqQuestions.forEach(question => {
    question.addEventListener("click", (e) => {
      e.stopPropagation(); // document click se bachao

      const parent = question.parentElement;

      // close other FAQs
      document.querySelectorAll(".ans-ques").forEach(item => {
        if (item !== parent) {
          item.classList.remove("active");
        }
      });

      // toggle current FAQ
      parent.classList.toggle("active");
    });
  });
}
