import { ExtraContent } from "./extra_content.js";
import { Util } from "../util.js";

export class ExtraContentAnalysisPanel extends ExtraContent {
  constructor() {
    super({
      id: "analysis-panel",
      hidden: false,
      content: `<section class="section is-paddingless">
        <div class="slider">
          <div class="box">
            <div class="card">
              <div class="card-image">
                <figure class="image is-5by3">
                  <img src="./image/line_chart.png" />
                </figure>
              </div>
              <div class="card-content">
                <i class="material-icons">show_chart</i>
                Line Chart Anslysis Result
              </div>
            </div>
          </div>
          <div class="box">
            <div class="card">
              <div class="card-image">
                <figure class="image is-5by3">
                  <img src="./image/bar_chart.png" />
                </figure>
              </div>
              <div class="card-content">
                <i class="material-icons">insert_chart</i>
                Bar Chart Analysis Result
              </div>
            </div>
          </div>
          <div class="box">
            <div class="card">
              <div class="card-image">
                <figure class="image is-5by3">
                  <img src="./image/pie_chart.png" />
                </figure>
              </div>
              <div class="card-content">
                <i class="material-icons">pie_chart</i>
                Pie Chart Analysis Result
              </div>
            </div>
          </div>
        </div>
      </section>`,
    });
  }

  init() {
    super.init();
  }

  originalZIndex;

  addContent({ document }) {
    super.addContent({ document: document });
    Util.loadScript({
      document: document,
      src: "https://cdn.jsdelivr.net/npm/bulma-carousel@4.0.24/dist/js/bulma-carousel.min.js",
      defer: true,
    }).then(() => {
      bulmaCarousel.attach(".slider", {
        infinite: true,
        loop: true,
        slidesToShow: 2,
        effect: "translate",
      });
    });
    var extraContent = document.getElementById("extra-content");
    this.originalZIndex = extraContent.style.zIndex;
    extraContent.style.zIndex = 0;
  }

  static removeContent({ document }) {
    super.removeContent({ document: document });
    var extraContent = document.getElementById("extra-content");
    extraContent.style.zIndex = this.originalZIndex;
  }

  addEvent({ document }) {
    super.addEvent({ document: document });
  }

  show() {
    super.show();
  }

  hide() {
    super.hide();
  }
}

export var extraContentAnalysisPanel = new ExtraContentAnalysisPanel();
