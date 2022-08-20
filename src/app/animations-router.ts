import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
  }from '@angular/animations';

export const slider = trigger('routeAnimations',[
    transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter , :leave',[
            style({
                position: 'absolute',
                top:0,
                right:0,
                with:'100%'
            })
        ],{ optional: true }),
        query(':enter',[
            style({
                right:'-100%',
            })
        ],{ optional: true }),
        query(':leave', animateChild()),
        group([
            query(':leave',[
                animate('600ms ease-out', style({ right: '100%', opacity: 0 }))
            ],{ optional: true }),
            query(':enter',[
                animate('600ms ease-out', style({ right: '0%'}))
            ],{ optional: true })
        ])
    ])
]);