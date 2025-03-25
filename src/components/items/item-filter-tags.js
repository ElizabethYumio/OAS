import { useEffect, useState } from "react";

import { MultiSelect } from "primereact/multiselect";

import { mapDataListToTags } from "@/common/utils";

import { getTags } from "@/api/tag.service";

import SharedTag from "../shared/tag/tag";

export default function ItemFilterTags({ onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  function fetchTags() {
    setLoading(() => true);
    getTags().then((data) => {
      setTags(() => mapDataListToTags(data));
      setLoading(() => false);
    });
  }

  function handleTagChange(e) {
    setSelectedTags(() => e.value);
  }

  useEffect(() => {
    onSubmit(selectedTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags]);

  useEffect(() => {
    fetchTags();
  }, []);

  function renderItemTemplate(item) {
    return <SharedTag value={item.name} color={item.primeColor}></SharedTag>;
  }

  return (
    <div className="flex flex-column gap-1">
      <label htmlFor="tags">
        Filter by <strong>Tags</strong>
      </label>
      <MultiSelect
        itemTemplate={renderItemTemplate}
        value={selectedTags}
        options={tags}
        onChange={handleTagChange}
        optionLabel="name"
        placeholder={loading ? "Loading tags..." : "Select tags"}
        className="w-full"
        id="tags"
        disabled={loading}
        filter
        maxSelectedLabels={2}
      />
    </div>
  );
}
