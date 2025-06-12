type GenerateOptions = {
    words: string[];       // входные слова (например, имя, фамилия)
    separator?: string;    // разделитель в логине, например '.'
    loginSuffix?: string;  // домен или приставка, например '@company'
    passwordLength?: number;
};

export function generateCredentials({
                                        words,
                                        separator = '.',
                                        loginSuffix = '',
                                        passwordLength = 12,
                                    }: GenerateOptions): { login: string; password: string } {
    const sanitize = (word: string) =>
        transliterate(word).trim().toLowerCase().replace(/[^a-z0-9]/gi, '');

    console.log(words);
    const safeWords = words.map(sanitize).filter(Boolean);

    const login = safeWords.join(separator) + loginSuffix;

    const password = Array.from({ length: passwordLength }, () =>
        getRandomChar()
    ).join('');

    return { login, password };
}

function getRandomChar(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    return chars[Math.floor(Math.random() * chars.length)];
}

function transliterate(text: string): string {
    const map: Record<string, string> = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd',
        е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
        й: 'y', к: 'k', л: 'l', м: 'm', н: 'n',
        о: 'o', п: 'p', р: 'r', с: 's', т: 't',
        у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch',
        ш: 'sh', щ: 'sch', ь: '', ы: 'y', ъ: '',
        э: 'e', ю: 'yu', я: 'ya',
    };

    return text
        .split('')
        .map((char) => {
            const lower = char.toLowerCase();
            const translit = map[lower] || '';
            return char === lower ? translit : translit.charAt(0).toUpperCase() + translit.slice(1);
        })
        .join('');
}