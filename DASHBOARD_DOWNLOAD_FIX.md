# Dashboard Download Fix - Two TSV Files for BSA Samples

## Problem Statement
The dashboard download function was only generating a single CSV file for BSA samples, while it should generate two TSV files (peptide-level and totals) to match the QC4L download behavior.

## Root Cause
The `downloadData` method in `dashboard.component.ts` was calling a single `mountCSV` function that only created peptide-level metrics (sequence, peak_area, mass_accuracy, retention_time) and saved it as a single `.csv` file.

## Solution Implemented

### File Modified
`qcloud2-client/src/app/application/layout/welcome/dashboard/dashboard.component.ts`

### Key Changes

1. **Split CSV Generation into Two Functions:**
   - `mountPeptideCSV()` - Generates peptide-level metrics (sequence, peak_area, mass_accuracy, retention_time)
   - `mountTotalsCSV()` - Generates comprehensive parameter data (all values and calculated values)

2. **Download Two Files:**
   - `<filename>_peptide.tsv` - Tab-separated peptide metrics
   - `<filename>_totals.tsv` - Tab-separated comprehensive data with all parameters

3. **Changed Separator from Comma to Tab:**
   - Updated separator from `,` to `\t` to generate proper TSV files
   - This matches the expected format for mass spectrometry data

4. **Added Null Safety:**
   - Added checks for parameter existence before accessing values
   - Handles missing/null values gracefully in the totals file

### Code Structure

```typescript
public downloadData(file: File): void {
  this.fileService.getSummary(file.checksum).subscribe(
    res => {
      // Download peptide-level data
      this.downloadCSV(this.mountPeptideCSV(res), file, '_peptide.tsv');
      
      // Download totals/summary data
      this.downloadCSV(this.mountTotalsCSV(res), file, '_totals.tsv');
    },
    err => console.error(err)
  );
}
```

### Peptide TSV Format
```
sequence	peak_area(au)	mass_accuracy(ppm)	retention_time(min)
VGINYQPPTVVPGGDLAK	1234.56	2.3	45.67
...
```

### Totals TSV Format
```
sequence	parameter	value	calculated_value
VGINYQPPTVVPGGDLAK	Peak area	1234.56	1234.56
VGINYQPPTVVPGGDLAK	Mass accuracy	2.3	2.3
VGINYQPPTVVPGGDLAK	Retention time	45.67	45.67
...
```

## Expected Behavior After Fix

### For BSA Samples:
When clicking the download button for a BSA file, the user will receive:
1. `<filename>_peptide.tsv` - Focused metrics for key QC parameters
2. `<filename>_totals.tsv` - Comprehensive data with all measured parameters

### For QC4L Samples:
The behavior remains consistent - both files are generated for all sample types.

## Testing Recommendations

1. **Test BSA Download:**
   - Open a BSA sample in the dashboard
   - Click the download button
   - Verify two TSV files are downloaded
   - Verify peptide file has 4 columns (sequence, peak_area, mass_accuracy, retention_time)
   - Verify totals file has 4 columns (sequence, parameter, value, calculated_value)

2. **Test QC4L Download:**
   - Open a QC4L (HeLa Isotopologues) sample
   - Click download
   - Verify two TSV files are still generated correctly
   - Check isotopologue sequences are properly formatted

3. **Test Edge Cases:**
   - Empty or minimal data files
   - Files with missing parameters
   - Files with null/undefined values

## Related Files
- `qcloud2-client/src/app/application/layout/welcome/dashboard/dashboard.component.ts` - Main change
- `qcloud2-server/src/controller/file.controller.ts` - Server endpoint providing the data
- `qcloud2-server/src/services/file.service.ts` - Data aggregation logic

## Impact Assessment
- **Low Risk:** Changes are isolated to the download functionality
- **No Breaking Changes:** Existing API endpoints remain unchanged
- **Backward Compatible:** Filenames now have descriptive suffixes instead of just `.csv`
- **User Experience:** Improved consistency across all sample types
