import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

export const eventEnterLeaveAnimationTrigger = trigger('eventAnimTrigger', [
    state('in', style({transform: 'scale(1)', opacity: 1})),
    state('out', style({transform: 'scale(0)', opacity: 0})),
    transition('in <=> out', animate(300)),
    transition('void => *', [
    style({transform: 'scale(0)', opacity: 0}),
    animate(300)
    ]),
    transition('* => void', [
    animate(300, style({transform: 'scale(0)', opacity: 0}))
    ])
]);
