import { Component, createEffect, createResource, For } from "solid-js";
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
    )

    return (
        <>
            <h1>Search Wikipedia</h1>
            <input onInput={(e) => setUserInput(e.currentTarget.value)} />
        </>
    );
};

export default App;
