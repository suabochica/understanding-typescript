import { Component, createResource, For } from "solid-js";
import * as E from 'fp-ts/lib/Either';
import {match, P} from 'ts-pattern';
import { z } from 'zod';

import { fetchWikiResults } from '../controller/wiki';
import { NetworkError, ParserError } from '../controller/errors';
import { createDebounced } from "./utils/create-debounced";

const App: Component = () => {
    const [userInput, setUserInput] = createDebounced('', 800);
    const [searchResult] = createResource(
        userInput,
        (input) => fetchWikiResults(input)(),
        { initialValue: E.of([]) }
    );

    return (
        <>
            <h1>Search Wikipedia</h1>
            <input onInput={(e) => setUserInput(e.currentTarget.value)} placeholder="Let's search it"/>

            {match(searchResult())
                .with({ _tag: 'Right'}, ({ right: results }) => (
                    <ul>
                        <For each={results}>
                            {(result) => (
                                <li>
                                    <a href={result.href} target="_blank">
                                        {result.title}
                                    </a>
                                </li>
                            )}
                        </For>
                    </ul>
                ))
                .with({_tag: 'Left'}, ({left: err}) =>
                    match(err)
                        .with(P.instanceOf(ParserError), (err) => (
                            <div>Error when parsing JSON!</div>
                        ))
                        .with(P.instanceOf(NetworkError), (err) => (
                            <div>Error when connecting to server!</div>
                        ))
                        .with(P.instanceOf(z.ZodError), (err) => (
                            <div>Unexpected data format from the server!</div>
                        ))
                        .otherwise((err) =>
                            <div>And error ocurred fetching the wiki results, please try again</div>
                        )
                )
                .exhaustive()
            }
        </>
    );
};

export default App;
