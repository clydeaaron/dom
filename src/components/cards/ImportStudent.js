import { useFormik } from 'formik';
import React from 'react';
import { StudentReader } from '../../functions';

export default function ImportStudent() {
    const onSubmit = async (values) => {
        if (!values.file) {
            return alert("No file found.");
        }

        const response = await StudentReader({ files: values?.file });
        const { valid, msg } = response;
        alert(msg);
    };

    const formik = useFormik({
        initialValues: {
            file: null
        },
        onSubmit: onSubmit
    });

    return (
        <div className="bg-zinc-400 bg-opacity-70 fixed inset-0 z-50 flex justify-center items-center">
            <form onSubmit={formik.handleSubmit} className="bg-white w-96 rounded-xl">
                <div className="bg-slate-100 rounded-t-md p-5">
                    <h1 className="text-xl font-semibold">Import Student</h1>
                </div>
                <div className="bg-slate-100 rounded-b-md p-5">
                    <label htmlFor="file" className="block mb-2">Import Students:</label>
                    <input
                        type="file"
                        id="file"
                        className="w-full px-4 py-2 mb-4 border rounded-md"
                        onChange={(event) => formik.setFieldValue("file", event.currentTarget.files[0])}
                        accept=".xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                    <div className="flex justify-end">
                        <a href="https://sbaesthetic.online/DOM_PHP/assets/Student-import-template.xlsx" download>
                            <button className="bg-blue border hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                                Download Template
                            </button>
                        </a>
                        <button type="submit" className="bg-green text-white px-4 py-2 rounded-md">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}