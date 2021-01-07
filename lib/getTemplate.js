export const getTemplate =
`
app.get("ROUTE_HERE", (req, res) => {
    res.sendFile(path.join(path.resolve() + 'ROUTE_HERE.html'));
});`

export default getTemplate