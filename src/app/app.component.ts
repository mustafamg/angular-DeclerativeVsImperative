import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Observable, Subject } from 'rxjs';
import {
  bufferCount,
  filter,
  map,
  merge,
  mergeWith,
  reduce,
  scan,
} from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  divControl: HTMLElement;
  streamer = new Subject();
  name = 'Angular';

  ngOnInit() {
    const xyPipe = this.streamer.pipe(
      map<MouseEvent, any>((e) => {
        return { x: e.clientX, y: e.clientY };
      })
    );

    const hDir = xyPipe.pipe(
      map((xy) => xy.x),
      bufferCount(2),
      map(([ox, nx]) => (ox > nx ? 'left' : 'right'))
    );

    const vDir = xyPipe.pipe(
      map((xy) => xy.y),
      bufferCount(2),
      map(([ox, nx]) => (ox > nx ? 'up' : 'down'))
    );
    const xydir = hDir.pipe(mergeWith(vDir), bufferCount(2));
    xydir.subscribe((x) => console.log(x));
    //xyPipe.subscribe((xy) => console.log(xy));
  }

  oldX = 0;
  oldY = 0;
  onMove(event) {
    this.streamer.next(event);
    // let dir = '';
    // if (event.clientX < this.oldX) {
    //   dir = 'left';
    // } else {
    //   dir = 'right';
    // }
    // this.oldX = event.clientX;

    // if (event.clientY < this.oldY) {
    //   dir += '-high';
    // } else {
    //   dir += '-low';
    // }
    // this.oldY = event.clientY;
    // console.log(dir);
  }
}
