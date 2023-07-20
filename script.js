"use strict"

const all_buttons = document.querySelectorAll(".toggle-button");
const all_buttons_containers = document.querySelectorAll(".toggle-button-container");

const enabled_label_line_color = "black";
const disabled_label_line_color = "#646464";

const enabled_button_color = "#32a850";
const disabled_button_color = "gray";

const options = {};

function modify_settings(element_id, value) {
    const button_element = document.getElementById(element_id);
    const button_container = button_element.parentElement;
    button_container.previousElementSibling.style.color = !value ? disabled_label_line_color : enabled_label_line_color;
    button_container.parentElement.style.borderColor = !value ? disabled_label_line_color : enabled_label_line_color;
    button_container.style.borderColor = !value ? disabled_button_color : enabled_button_color;
    button_element.style.backgroundColor = !value ? disabled_button_color : enabled_button_color;
    button_element.style.left = value ? "47%" : "0%";
    button_element.innerText = !value ? "0" : "1";
    setTimeout(() => { button_element.style.width = "200px"; }, 100);
    if (value) { button_element.style.width = "240px"; }
    else { button_element.style.width = "160px"; }
    options[element_id] = value;
    localStorage.setItem("options", JSON.stringify(options));
    console.log(options);
}

function apply_user_settings(settings) {
    all_buttons.forEach((toggle_button, button_index) => {
        const element_id = toggle_button["id"];
        if (settings[element_id] == undefined) modify_settings(element_id, false);
        else modify_settings(element_id, settings[element_id]);
        all_buttons_containers[button_index].onclick = () => {
            const on_click_value = options[element_id] ? false : true;
            modify_settings(element_id, on_click_value);
        }
    });
}

const user_settings = localStorage.getItem("options");

if (user_settings == null) { apply_user_settings({}); }
else { apply_user_settings(JSON.parse(user_settings)); }