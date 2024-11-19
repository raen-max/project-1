import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";



export class JsonDisplay extends DDDSuper(LitElement) {
  /**
   * Constructor to initialize default properties
   */
  constructor() {
    super();
    this._initializeProperties();
  }

  /**
   * Initialize component properties
   */
  _initializeProperties() {
    this.title = "";
    this.slug = "";
    this.description = "";
    this.location = "";
    this.img = "";
    this.order = "";
    this.updateddate = "";
    this.inputLink = "";
  }

  /**
   * Define the custom tag name
   */
  static get tag() {
    return "json-display";
  }

  /**
   * Define reactive properties for the component
   */
  static get properties() {
    return {
      source: { type: String },
      title: { type: String },
      description: { type: String },
      slug: { type: String },
      location: { type: String },
      img: { type: String },
      order: { type: String },
      updateddate: { type: String },
      inputLink: { type: String },
    };
  }

  /**
   * Define scoped styles for the component
   */
  static get styles() {
    return [
      css`
        .card-container {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }

        .image {
          display: inline-block;
          max-width: 240px;
        }

        .image img {
          display: block;
          width: 240px;
          height: 240px;
          justify-content: center;
        }

        .title {
          margin: 10px;
          font-weight: bold;
          color: var(--ddd-theme-default-success);
        }

        .description {
          font-weight: lighter;
          margin: 5px;
        }

        div:hover {
          background-color: var(--ddd-theme-default-skyLight);
        }
      `,
    ];
  }

  /**
   * Render the HTML structure of the component
   */
  render() {
    return html`
      <div class="card-container">
        ${this._renderCard()}
      </div>
    `;
  }

  /**
   * Render the card with dynamic data
   */
  _renderCard() {
    return html`
      <div class="image">
        <img
          src="${this._computeImageSource()}"
          alt="${this.title || "No title available"}"
        />
        <div class="title">Title: ${this.title || "Untitled"}</div>
        <div class="description">
          ${this.description || "No description available"}
        </div>
        <div>Order: ${this.order || "N/A"}</div>
        <div>Updated: ${this.updateddate || "Unknown"}</div>
      </div>
    `;
  }

  /**
   * Compute the full image source URL
   */
  _computeImageSource() {
    return this.inputLink && this.img
      ? `${this.inputLink}/${this.img}`
      : "https://via.placeholder.com/240"; // Default placeholder image
  }
}

customElements.define(JsonDisplay.tag, JsonDisplay);
