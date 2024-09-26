Sub ExcelToJsonWithBoolean()
    Dim rowIndex As Long
    Dim sheet As Worksheet
    Dim jsonString As String
    
    ' Set the worksheet where the UUIDs are stored
    Set sheet = ThisWorkbook.Sheets("Sheet1")
    
    ' Start the JSON string
    jsonString = "{"
    
    ' Loop through each row with a UUID in column A
    For rowIndex = 2 To sheet.UsedRange.Rows.Count
        ' Get the UUID from column A
        uuid = sheet.Cells(rowIndex, 1).Value
        
        ' Add the UUID and associated boolean value to the JSON string
        jsonString = jsonString & """" & uuid & """:{""BOOL"": true},"
    Next rowIndex
    
    ' Remove the trailing comma from the last element and close the JSON
    jsonString = Left(jsonString, Len(jsonString) - 1) & "}"
    
    ' Write the JSON string to a file
    Dim fso As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    Dim fileStream As Object
    Set fileStream = fso.CreateTextFile("output.json", True)
    fileStream.Write jsonString
    fileStream.Close
    
    ' Inform the user the process is complete
    MsgBox "Excel UUIDs have been converted to JSON with boolean values!"
End Sub
