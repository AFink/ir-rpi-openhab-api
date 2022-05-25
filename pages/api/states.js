const {
    storeState,
    getState,
    closeState
} = require('../../libs/database');

const SECRET_KEY = process.env.SECRET_KEY;


export default async function handler(req, res) {
    if (SECRET_KEY) {
        if (req.body.key !== SECRET_KEY) {
            return res.send(403, 'Permission denied')
        }
    }

    switch (req.method) {
        case 'POST':
            const {
                state
            } = req.body
            if (state == 'ON') {
                let store = await storeState();
                res.status(200).json({
                    success: true,
                    id: store[0]
                })
            } else if (state == 'OFF') {
                const {
                    id
                } = req.body
                if (id) {
                    let state = await getState(id);
                    if (state && !state.off_timestamp) {
                        await closeState(id);
                        res.status(200).json({
                            success: true,
                        })
                    } else {
                        res.send(404, 'Method Not Allowed');
                    }
                    console.log(state);
                } else {
                    res.send(405, 'Method Not Allowed');
                }
            } else {
                res.send(405, 'Method Not Allowed');
            }
            break;
        case 'GET':
            const {
                id
            } = req.body;
            let s = await getState(id);
            res.status(200).json({
                success: true,
                state: s
            })
            break;
        default:
            res.send(405, 'Method Not Allowed');
            break;
    }
}