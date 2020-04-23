import { Group } from './group';

export interface Speech {
    id: string;
    author: string;
    subject: string;
    content: string;
    publishedDate: any;
    group: string;
}

// export function generateMockSpeech(): Speech[] {
//     return [ {
//         id: 1,
//         author: "Klein",
//         subject: "Sample Subject",
//         content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         publishedDate: new Date("10/10/20"),
//         group: "1",
//         isActive: true
//     }];
//   }