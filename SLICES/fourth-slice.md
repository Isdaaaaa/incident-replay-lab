# Slice: filtering-and-highlighting

## Scope

Implement filtering and highlighting in the timeline UI.

## Acceptance Criteria

- [ ] Add filter controls for event kind (incident, alert, trace, deploy, note)
- [ ] Add filter for severity level or service name
- [ ] Highlight selected filters in the timeline display
- [ ] Applied filters persist during page navigation (URL state or session storage)
- [ ] Tests or manual verification steps in README

## Files to Read First

- `components/Timeline.tsx`
- `pages/timeline.tsx`
- `README.md`

## Recommended Implementation

1. Add filter state management (React hooks or URL params)
2. Create filter UI component with checkboxes or dropdown
3. Filter normalized events based on selected criteria
4. Update Timeline components to highlight filtered rows
5. Test with different filter combinations
