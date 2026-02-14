export const SLIDER_MIN = 0;
export const SLIDER_MAX = 10000;
export const PERCENT_MIN = 0.0001;
export const PERCENT_MAX = 100.0;

const LOG_BASE = Math.pow(PERCENT_MAX / PERCENT_MIN, 1 / SLIDER_MAX);

export function sliderToPercentage(value) {
    if (value <= SLIDER_MIN) return 0;
    return PERCENT_MIN * Math.pow(LOG_BASE, value);
}

export function formatPercentage(percentage) {
    if (percentage === 0) return "0%";
    if (percentage < 0.01) return `${percentage.toFixed(4)}%`;
    if (percentage < 1) return `${percentage.toFixed(3)}%`;
    return `${percentage.toFixed(2)}%`;
}