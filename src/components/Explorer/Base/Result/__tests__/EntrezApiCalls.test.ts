import { tryGetGenBankTitle, tryGetSraStudyName } from '../EntrezApiCalls'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

test('get title for NC_045512.2', async () => {
    const title = await tryGetGenBankTitle('NC_045512.2')
    expect(title).toBe(
        'Severe acute respiratory syndrome coronavirus 2 isolate Wuhan-Hu-1, complete genome'
    )
})

test('get title for NC_045512.2-invalid', async () => {
    await delay(500)
    const title = await tryGetGenBankTitle('NC_045512.2-invalid')
    expect(title).toBe('')
})

test('get title for ERR2756788', async () => {
    await delay(500)
    const title = await tryGetSraStudyName('ERR2756788')
    expect(title).toBe('Metagenomics of viral communities of vampire bats in Peru')
})

test('get title for ERR2756788-invalid', async () => {
    await delay(500)
    const title = await tryGetSraStudyName('ERR2756788-invalid')
    expect(title).toBe('')
})
