import axios from 'axios';
import * as fs from 'fs';
import dotenv from 'dotenv'

(async () => {
    dotenv.config()
    const run_id = fs.readFileSync('./azure.txt', 'utf-8');
    const headers = { 'Authorization': `Basic ${process.env.AUTHORIZATION}` }
    const response = await axios.get(`https://dev.azure.com/playwrightpoc/PlaywrightPOC/_apis/test/Runs/${run_id}/results?api-version=7.1-preview.6`, { headers: headers })
    response.data.value.map(async (value: any) => {
        const file = fs.readFileSync(`./screenshots/${value.testCase.id}.png`)
        const testCaseId = value.id
        let data = {
            stream: file.toString('base64'),
            fileName: `${value.testCase.id}.png`,
            comment: 'Full desktop screenshot',
            attachmentType: 'GeneralAttachment'
        }
        await axios.post(`https://dev.azure.com/playwrightpoc/PlaywrightPOC/_apis/test/Runs/${run_id}/Results/${testCaseId}/attachments?api-version=7.1-preview.1`,
            data,{headers: headers}).then(function (response) {
                console.log(response.status)
            })
    })
})();
