## Development features

## Basic

### 1. Text types(internal):

- format1(rich text):
  - select: bold, italic, color, background color, link, unlink
  - insert: link, image, video
- format2(only text, no image):
  - select: bold, italic, color, background color, link, unlink
  - insert: link

Text can be used for paragraph, heading, table's content

### 2. Container

Container can be tabs, menu(one level), or customized element.

Container has whole block's power, so all common block can be inserted into a containers, eg. Heading/Paragraph/Carousel in a tab.

## Phase 1

1. Heading:

   Can change heading, color. when selecting text, text option is shown(see Paragraph/text)

2. [done]Paragraph: can change align(left, center, right, line height). supports sub element:

- text: can change color, bold, italic, under line, strike through, background color. can add link
- link:
  - change href
  - change target
  - when selected, can have text options
- image(specially for small images/icon images):
  - src
  - border
  - display: inline/block
  - margin
  - align(for block): left/right
  - can have link
- media(video, audio)
- list
  - style: bullet/number
  - text has text options

3. [done]Table

- change rows, columns
- cell padding
- border width & color
- use header/not
  - header background
  - header bold/not
- add column in between, add before in first, add after in last
- add row in between, add before in first, add after in last
- delete row/column
- text having text option

4. [done]Full image

- can have link

5. [done]Quote

- when text is selected, can have text options

6. [done]Code

todo:

- [general]set background, margin top,
- [general]delete
- [composed tools]add before/after element inside container, this should be done in the property

## Phase 2

1. [intractive]Tabs
2. [intractive]Expandable list
3. [content]Gallery, with callback option for getting data
4. [content]Carousel, with callback for getting data
5. [extended]Composed element

- image text
- hero
- block text

8. Content blocks(integrate with backend)

- how many columns per row
- how many rows
- source

## Phase 3

3. Facebook page
4. Twitter tweet
5. Event calendar, with call back for getting data
6. Another page/article/content
