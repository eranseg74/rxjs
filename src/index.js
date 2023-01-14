import { Observable, of, from, fromEvent, interval } from "rxjs";
import {
  map,
  pluck,
  filter,
  reduce,
  take,
  scan,
  tap,
  mergeMap,
  switchMap,
  concatMap,
  exhaustMap,
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

// const observable = new Observable((subscriber) => {
//   subscriber.next("Hello World!");
//   subscriber.error("Error!");
//   subscriber.next("test");
//   subscriber.complete();
//   subscriber.next("next");
// });

// const observable = new Observable((subscriber) => {
//   const id = setInterval(() => {
//     subscriber.next("test");
//     console.log("leak");
//   }, 1000);

//   return () => {
//     clearInterval(id);
//   };
// });

// const observable = of(1, 2, 3, 4, 5).pipe(reduce((acc, val) => acc + val, 0));
// const observable = fromEvent(document, "keydown").pipe(
//   map((event) => event.code)
// );
// const observable = fromEvent(document, "keydown").pipe(pluck("code"));
// const observable = fromEvent(document, "keydown").pipe(
//   map((event) => {
//     return event.code === "Space" ? event.code : null;
//   })
//   //The same action as the pluck and filter. Pluck and filter are more suitable. Try to avoid implementing all the logic in a single operator
//   // pluck("code"),
//   // filter((code) => code === "Space")
// );

const observable1 = interval(500).pipe(
  take(10),
  // tap({
  //   next(val) {
  //     console.log(val);
  //   },
  // }),
  tap(console.log), // The same 'tap' as in the comment above
  reduce((acc, val) => acc + val, 0)
);
// const observable = interval(500).pipe(
//   take(10),
//   scan((acc, val) => acc + val, 0)
// );

const button = document.querySelector("#btn");

const observable2 = fromEvent(button, "click").pipe(
  mergeMap(() => {
    return interval(1000).pipe(tap(console.log), take(5)); //ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
  })
);
const observable3 = fromEvent(button, "click").pipe(
  switchMap(() => {
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
      take(5),
      tap({
        complete() {
          console.log("inner observable completed");
        },
      })
    ); //ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
  })
);
const observable4 = fromEvent(button, "click").pipe(
  concatMap(() => {
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
      take(5),
      tap({
        complete() {
          console.log("inner observable completed");
        },
      })
    ); //ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
  })
);
const observable = fromEvent(button, "click").pipe(
  exhaustMap(() => {
    return ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1").pipe(
      take(5),
      tap({
        complete() {
          console.log("inner observable completed");
        },
      })
    ); //ajax.getJSON("https://jsonplaceholder.typicode.com/todos/1");
  })
);

const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
    // value.subscribe(console.log);
  },
  complete: () => {
    console.log("complete");
  },
  error: (err) => {
    console.error(err);
  },
});

console.log("hello");

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 4000);
