// js files
import { handleSubmit } from "./js/formHandler";
import { checkForURL } from "./js/urlChecker";

// sass files
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";
import "./styles/resets.scss";

document.getElementById("urlForm").addEventListener("submit", handleSubmit);

export { handleSubmit, checkForURL };
