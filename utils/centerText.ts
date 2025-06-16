export function centerText(text: string) {
    const width = process.stdout.columns || 80;
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text;
}

export default centerText;
