import { LitElement, html, css } from "lit";
import "@haxtheweb/simple-icon/simple-icon.js";
export class JsonAnalyzer extends LitElement {
  static get properties() {
    return {
      inputLink: { type: String },
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      lastUpdated: { type: String },
      items: { type: Array },
      value: { type: String },
      loading: { type: Boolean, reflect: true },
      hexcode: { type: String },
      icon: { type: String },
      isVisible: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      img {
        max-width: 200px;
        max-height: 100px;
      }
      :host([loading]) .results {
        opacity: 0.1;
        visibility: hidden;
        height: 1px;
      }
  
      .AnalyzeButton {
        background-color: #f4b400; /* button color */
        height: 45px;
        width: 120px;
        border: 2px solid #0f9d58; /* border */
        box-shadow: none;
        font-family: var(--ddd-font-primary);
        font-size: 16px;
        border-radius: 5px;
        display: inline-block;
        transition: background-color 0.3s, transform 0.2s;
      }
  
      .AnalyzeButton:hover {
        background-color: #0f9d58;
        color: #fff;
        transform: scale(1.05); /* Button hover effect */
      }
  
      input {
        font-size: 20px;
        line-height: 40px;
        width: 400px;
        left: 350px;
        display: inline-block;
        margin-right: 10px;
        border-radius: 5px;
        box-shadow: none;
        border: 2px solid #0f9d58; /* input border */
      }
  
      .results {
        visibility: visible;
        height: 100%;
        opacity: 1;
        transition-delay: 0.5s;
        transition: 0.5s all ease-in-out;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      }
  
      .item {
        flex: 1 1 calc(25% - 20px);
        box-sizing: border-box;
        width: 320px;
        margin: 10px;
        padding: 15px;
        border: 3px solid #0f309d; /* Increased border thickness */
        border-radius: 10px;
        background-color: #f9f9f9;
        height: 600px;
        flex-wrap: wrap;
        gap: 16px;
        text-align: center;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s, box-shadow 0.3s;
      }
  
      .item:hover {
        transform: scale(1.05);
        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2); /* Card hover effect */
      }
  
      .header {
        display: flex;
        justify-content: center; /* Horizontal alignment */
        align-items: center; /* Vertical alignment */
      }
  
      .overview {
        width: 500px;
        padding: 20px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
  
      details {
        margin: 16px;
        padding: 16px;
        background-color: #4285f4;
      }
      summary {
        font-size: 24px;
        padding: 8px;
        color: white;
        font-size: 42px;
      }
  
      #btn {
        background-color: #f4b400;
        height: 45px;
        width: 120px;
        border: 2px solid #0f9d58;
        box-shadow: none;
        font-family: var(--ddd-font-primary);
        font-size: 16px;
        border-radius: 5px;
        margin: 10px auto;
        transition: background-color 0.3s, transform 0.2s;
      }
  
      #btn:hover {
        background-color: #0f9d58;
        color: white;
        transform: scale(1.1); /* Button hover effect */
      }
  
      @media (max-width: 1024px) {
        .results {
          grid-template-columns: repeat(auto-fit, minmax(3, 1fr));
        }
      }
  
      @media (max-width: 768px) {
        .results {
          grid-template-columns: repeat(auto-fit, minmax(2, 1fr));
        }
      }
  
      @media (max-width: 480px) {
        .results {
          grid-template-columns: repeat(auto-fit, minmax(1, 1fr));
        }
      }
    `;
  }
  

  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.logo = "";
    this.lastUpdated = "";
    this.items = [];
    this.value = null;
    this.loading = false;
    this.inputLink = "";
    this.hexcode = "";
    this.icon = "";
    this.isVisible = false;
  }

  render() {
    return html`
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h2>Json Analyzer</h2>
      <h2>Got URL?</h2>
      <div class="header">
        <form>
          <input id="input" placeholder="Add URL Here" />
          <button type="submit" class="AnalyzeButton" @click=${this.getData}>
            Analyze
          </button>
        </form>
      </div>

      <div class="overview" style="background-color: ${this.hexcode}">
        <div class="info" ?hidden="${!this.isVisible}">
          <img src="${this.inputLink}/${this.logo}" />
          <simple-icon icon="${this.icon}"></simple-icon>
          <div class="name">${this.name}</div>
          <div class="description">${this.description}</div>
          <div class="lastUpdated">
            Last Updated: ${this.toDate(this.lastUpdated)}
          </div>
          <div class="theme">Theme: ${this.theme}</div>
          <div class="created">Created: ${this.toDate(this.created)}</div>
        </div>
      </div>
      <div class="results">
        ${this.items.map(
          (item, index) => html`
            <div class="item">
              <json-display
                source="${item.href}"
                title="${item.title}"
                description="${item.description}"
                slug="${item.slug}"
                location="${item.location}"
                img="${item.metadata &&
                item.metadata.files &&
                item.metadata.files[0]
                  ? item.metadata.files[0].url
                  : `${this.logo}`}"
                updateddate=${this.toDate(item.metadata.updated)}
                order=${item.order}
                inputLink="${this.inputLink}"
              ></json-display>
 

              <a href="${this.inputLink}/${item.slug}" target="_blank">
                <button class="slug" id="btn">See Webpage</button>
              </a>

              <a href="${this.inputLink}/${item.location}" target="_blank">
                <button class="location" id="btn">See Location</button>
              </a>
            </div>
          `
        )}
      </div>

      <!-- if img returns nothing, instead return this.backup img = URL for hax stuff -->
    `;
  }

  toDate(timestamp) {
    return new Date(timestamp * 1000).toUTCString();
  }

  getData(e) {
    e.preventDefault();
    this.isVisible = false;
    this.loading = true;
    this.inputLink = this.shadowRoot.querySelector("input").value;
    if (!this.inputLink.startsWith("https://")) {
      this.inputLink = "https://" + this.inputLink;
    }

    if (!this.inputLink.endsWith("/site.json")) {
      this.inputLink = this.inputLink.replace("/site.json", "");
    }
    fetch(`${this.inputLink}/site.json`)
      .then((d) => (d.ok ? d.json() : {}))
      .then((data) => {
        if (data) {
          this.items = [];
          this.items = data.items;
          this.name = data.title;
          this.description = data.description;
          this.logo = data.metadata.site.logo;
          // make logo into image with this as the site ref
          this.theme = data.metadata.theme.element;
          this.created = data.metadata.site.created;
          this.lastUpdated = data.metadata.site.updated;
          this.hexcode = data.metadata.theme.variables.hexCode;
          this.icon = data.metadata.theme.variables.icon;
          console.log(this.icon);
          this.loading = false;
          this.isVisible = true;
        }
      });
  }

  static get tag() {
    return "json-analyzer";
  }
}
customElements.define(JsonAnalyzer.tag, JsonAnalyzer);