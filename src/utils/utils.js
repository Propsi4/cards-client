export const getUsername = async (token) => {
    const join_resp = await fetch("/api/get_username", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: token
        }),
    }).then((res) => res.json());
    return join_resp.username;
}
export const getImage = (card) => {
    return require('../images/cards/'+card.name+'-'+card.suit+'.png')
} 
export const setToken = async (username) => {
    const token = await fetch("/api/get_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username
        }),
    }).then((res) => res.json()).then((res) => res.token);
    
    localStorage.setItem("token", token);
};
export const isAllNull = (cards_on_table) => {
    let result;
    cards_on_table.every((obj) => {
        result = Object.keys(obj).length === 0;
  })
  return result;

};