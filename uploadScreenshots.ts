import axios from 'axios';
import * as fs from 'fs';
import dotenv from 'dotenv'

(async () => {
    dotenv.config()
    const run_id = fs.readFileSync('./azure.txt', 'utf-8');
    const basicAuth = {username: '',password: String(process.env.AZURE_TOKEN)}
    const response = await axios.get(`https://dev.azure.com/playwrightpoc/PlaywrightPOC/_apis/test/Runs/${run_id}/results?api-version=7.1-preview.6`, 
    {auth: basicAuth})
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
            data, {auth: basicAuth})
    })
})();
