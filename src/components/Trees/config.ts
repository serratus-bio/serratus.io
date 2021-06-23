export const defaultOrder = 'Amarillovirales'

export const defaultFamily = 'Coronaviridae'

export function getLevelValues(searchLevel: string) {
    if (searchLevel === 'order') {
        return [
            'Amarillovirales',
            'Articulavirales',
            'Bunyavirales',
            'Cryppavirales',
            'Durnavirales',
        ]
    } else {
        return [
            'Adenoviridae',
            'Adomaviridae',
            'Alloherpesviridae',
            'Amnoonviridae',
            'AMR',
            'Anelloviridae',
            'Arenaviridae',
            'Arteriviridae',
            'Asfarviridae',
            'Astroviridae',
            'Birnaviridae',
            'Bornaviridae',
            'Caliciviridae',
            'Circoviridae',
            'Coronaviridae',
            'Filoviridae',
            'Flaviviridae',
            'Geminiviridae',
            'Genomoviridae',
            'Hantaviridae',
            'Hepadnaviridae',
            'Hepeviridae',
            'Herpesviridae',
            'Iridoviridae',
            'Matonaviridae',
            'Nairoviridae',
            'Nodaviridae',
            'Orthomyxoviridae',
            'Papillomaviridae',
            'Paramyxoviridae',
            'Parvoviridae',
            'Peribunyaviridae',
            'Phenuiviridae',
            'Picobirnaviridae',
            'Picornaviridae',
            'Pneumoviridae',
            'Polyomaviridae',
            'Poxviridae',
            'Reoviridae',
            'Rhabdoviridae',
            'Smacoviridae',
            'Sunviridae',
            'Tobaniviridae',
            'Togaviridae',
            'Totiviridae',
        ]
    }
}
