<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validate the request
        $request->validate([
            'document' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Store the file
        // $path = $request->file('document')->store('uploads');

        $path = $this->store($request);

        // Return a response
        return response()->json(['path' => $path], 200);
    }

    public function store(Request $request)
    {
        $request->validate(['document' => 'required|image|max:2048']); 
        $image = $request->file('document');

        $fileName = uniqid() . '.' . $image->getClientOriginalExtension(); 
        $path = $image->storeAs('uploads', $fileName);

        $thumbnailPath = 'thumbnails/' . $fileName;
        $intervention = Image::make($image->getRealPath());
        $intervention->fit(200, 200, function ($constraint) {
        $constraint->aspectRatio();
        })->save(storage_path('app/public/' . $thumbnailPath));
        
        return $path;
    }
}