import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { z } from 'zod';

import { NetworkError, ParserError } from './errors';

const WikipediaResult = z.tuple([
    z.string(),
    z.array(z.string()),
    z.array(z.string()),
    z.array(z.string()),
]);

type WikipediaResult = z.infer<typeof WikipediaResult>;

export type WikiResultData = {
    href: string;
    title: string;
    content: string;
}[];

export type WikiResultError =
| NetworkError
| ParserError
| z.ZodError<WikipediaResult>

export const fetchWikiResults = (
    query: string
): TE.TaskEither<WikiResultError, WikiResultData> => {
    return query === ''
        ? TE.of([])
        : pipe(
            TE.tryCatch(
                () =>
                    fetch(
                        `https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search=${query}`
                    ),
                (error) => new NetworkError((error as Error).message)
            ),
            TE.chainW((response) =>
                TE.tryCatch(
                    () => response.json(),
                    (error) => new ParserError((error as Error).message)
                )
            ),
            TE.chainW((payload) => {
                const parsed = WikipediaResult.safeParse(payload);

                return parsed.success
                    ? TE.right(parsed.data)
                    : TE.left(parsed.error);
            }),
            TE.map(([, titles, contents, hrefs]) =>
                titles.map((title, i) => ({
                    href: hrefs[i],
                    title,
                    content: contents[i]
                }))
            )
    );
}
