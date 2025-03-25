import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

import { getUrlSearchParams } from "@/common/utils";
import { INPUT_KEYS } from "@/common/constants";

import SharedFieldset from "../shared/fieldset/fieldset";
import SharedButton from "../shared/button/button";
import ItemFilterTags from "./item-filter-tags";

export default function ItemFilter() {
  const router = useRouter();

  const [query, setQuery] = useState();
  const [tags, setTags] = useState([]);

  function updateUrlSearchParams() {
    const urlSearchParams = getUrlSearchParams({
      query,
      tags: tags.map((tag) => tag.id),
    });
    router.push(`?${urlSearchParams.toString()}`);
  }

  function handleQueryChange(e) {
    setQuery(() => e.target.value);
  }

  function handleQueryBlur(e) {
    updateUrlSearchParams();
  }

  function handleQueryEnter(e) {
    if (e?.key === INPUT_KEYS.ENTER) {
      updateUrlSearchParams();
    }
  }

  function handleTagFilterSubmit(tags) {
    setTags(() => tags);
  }

  useEffect(() => {
    updateUrlSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  function renderSearchInputField() {
    return (
      <div className="flex flex-column gap-1">
        <label htmlFor="query">
          Search by <strong>Item Name</strong>
        </label>
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            className="w-full"
            placeholder="Search..."
            value={query}
            onChange={handleQueryChange}
            onBlur={handleQueryBlur}
            onKeyUp={handleQueryEnter}
            id="query"
          />
        </IconField>
      </div>
    );
  }

  function renderSubmitButton() {
    return (
      <div className="flex justify-content-end">
        <SharedButton icon="pi pi-search" label="Search"></SharedButton>
      </div>
    );
  }

  return (
    <SharedFieldset legend="Search">
      <div className="-m-2 flex flex-column gap-4">
        {renderSearchInputField()}
        <ItemFilterTags onSubmit={handleTagFilterSubmit} />
        {renderSubmitButton()}
      </div>
    </SharedFieldset>
  );
}
