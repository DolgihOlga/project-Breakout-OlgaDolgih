
export function SwitchToState(NewStateH) {
    location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}
export function SwitchToMainPage() {
    SwitchToState({pagename: 'main'});
}
export function SwitchToRulesPage() {
    SwitchToState({pagename: 'rules'});
}
export function SwitchToRecordsPage() {
    SwitchToState({pagename: 'records'});
}
export function SwitchToGamePage() {
    SwitchToState({pagename: 'play'});
    location.reload();
}