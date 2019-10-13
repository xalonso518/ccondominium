// import { animate, AnimationEntryMetadata, state, style, transition, trigger, group, keyframes } from '@angular/core';
// import { animate, AnimationEntryMetadata, state, group} from '@angular/core';
import { animate, trigger, style, transition, keyframes, query, stagger, state } from '@angular/animations';
import { AnimationTriggerMetadata } from '@angular/animations';

// Component transition animations
export const slideInDownAnimation: AnimationTriggerMetadata =
    trigger('flyInOut', [
        state('true', style({ transform: 'translateY(0%)', opacity: '1' })),
        state('false', style({ transform: 'translateY(-200%)', opacity: '0.1' })),
        transition('void => *', [
            animate(200, style(
                { transform: 'translateY(0%)', opacity: '0.5' }
            ))
        ]),
        transition('* => void', [
            animate(200, style(
                { transform: 'translateY(-200%)', opacity: '0.5' }
            ))
        ]),
        transition('true => false', animate('200ms ease-in')),
        transition('false => true', animate('200ms ease-out'))
    ]);

// export const listAnimation: AnimationEntryMetadata =
//    trigger('flyInOut', [
//        state('in', style({ transform: 'translateX(0)' })),
//        transition('void => *', [
//            animate(300, keyframes([
//                style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
//                style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
//                style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
//            ]))
//        ]),
//        transition('* => void', [
//            animate(300, keyframes([
//                style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
//                style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
//                style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
//            ]))
//        ])
//    ])

// export const listAnimation = trigger('flyInOut', [
//    transition('* => *', [


//        query(':enter', stagger('300ms', [
//            style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
//            animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
//                style({ transform: 'scale(1)', opacity: 1 }))  // final
//        ]), { optional: true })
//        ,
//        query(':leave', stagger('100ms', [
//            style({ transform: 'scale(1)', opacity: 1, height: '*' }),
//            animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
//                style({
//                    transform: 'scale(0.5)', opacity: 0,
//                    height: '0px', margin: '0px'
//                }))
//        ]), { optional: true })
//    ])
// ])

export const listAnimation = trigger('flyInOut', [
    transition('* => *', [
        // query(':leave', [
        //    stagger(50, [
        //        animate('0.1s', style({ opacity: 0 }))
        //    ])
        // ]),
        query(':enter', [
            style({ opacity: 0 }),
            stagger(50, [
                style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
                animate('0.1s cubic-bezier(0.25,0.1,0.25,1)',
                style({ transform: 'scale(1)', opacity: 1 }))  // final
            ])
        ], { optional: true })
    ])
]);
