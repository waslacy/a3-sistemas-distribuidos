const fs = require("fs");
const Express = require("express");
var cors = require('cors')
const app = Express();

app.use(cors())

var data = fs.readFileSync("db.json");
data = JSON.parse(data);

app.get("/pergunta/:id", (req, res) => {
    switch (req.params.id) {
        case "a":
            res.send(data.a);
            break;

        case "b":
            res.send(data.b);
            break;

        case "c":
            res.send(data.c);
            break;

        case "d":
            res.send(data.d);
            break;

        case "e":
            res.send(data.e);
            break;

        default:
            res.send(
                JSON.stringify({
                    error: {
                        id: 1,
                        message: "Pergunta não existente",
                    },
                })
            );
            break;
    }
});

app.listen(3000, () => console.log("listening"));
