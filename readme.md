# Learn By Doing - Typeahead Helper

It is a common pattern within forms to take a text based input and provide suggestions for a given input i.e say for an address as people begin typing. This is referred to as a typeahead.

Your task is to provide a solution to support this feature. It must ingest a list of strings to filter i.e a list of towns or cities then provide a function that will filter that list based on a prefix.

For example if given the list of strings:
```
Bears
Beats
Battlestar Galactica
```
and the prefix of 'Be' then the function would return Bears and Beats.

It is important to note that in many cases a list of cities and towns in the world and could be over a million items so to avoid latency the solution must be efficient as possible.
