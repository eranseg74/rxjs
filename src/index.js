import { Observable } from "rxjs";

// const observable = new Observable((subscriber) => {
//   subscriber.next("Hello World!");
//   subscriber.error("Error!");
//   subscriber.next("test");
//   subscriber.complete();
//   subscriber.next("next");
// });

const observable = new Observable((subscriber) => {
  const id = setInterval(() => {
    subscriber.next("test");
    console.log("leak");
  }, 1000);

  return () => {
    clearInterval(id);
  };
});

const subscription = observable.subscribe({
  next: (value) => {
    console.log(value);
  },
  complete: () => {
    console.log("complete called!");
  },
  error: (err) => {
    console.error(err);
  },
});

setTimeout(() => {
  subscription.unsubscribe();
}, 4000);
