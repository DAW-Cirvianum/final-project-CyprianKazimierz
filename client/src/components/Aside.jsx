import "../css/index.css";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { showError } from "../general";
import { useTranslation } from "react-i18next";
export default function Aside() {
  const { cities, filterPosts } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minKM: "",
    maxKM: "",
    mark: "",
    model: "",
    since: "",
    to: "",
    doors: "",
    motor: "",
    location: "",
    color: "",
    bodywork: "",
    fuel: "",
  });

  const buildParams = (filters) => {
    return Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value.toString().trim() !== ""
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let params = new URLSearchParams(buildParams(filters));

    let response = await filterPosts(params);

    if (!response.ok) {
      showError(response.status);
      return;
    }

    setFilters({
      minPrice: "",
      maxPrice: "",
      minKM: "",
      maxKM: "",
      mark: "",
      model: "",
      since: "",
      to: "",
      doors: "",
      motor: "",
      location: "",
      color: "",
      bodywork: "",
      fuel: "",
    });
  };

  return (
    <div className="sidebarContent w-full md:w-64 shadow p-0 m-0">
      <form onSubmit={handleSubmit}>
        {/* PRICE */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          <Disclosure.Button className="flex w-full justify-center items-center font-medium focus:outline-none  hover:border-gray-800 cursor-default rounded-none">
            <h1 className="text-xl font-bold">{t("filtres")}</h1>
          </Disclosure.Button>
        </Disclosure>
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("price")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex w-full gap-2 text-black items-center">
                  <div className="flex flex-col items-center ">
                    <label htmlFor="minPrice">{t("minPrice")}:</label>
                    <input
                      type="number"
                      name="minPrice"
                      id="minPrice"
                      placeholder={t("minPrice")}
                      min="0"
                      max="99999999"
                      maxLength="8"
                      step="0.01"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, minPrice: e.target.value })
                      }
                      className="border border-gray-300 w-3/4 rounded-md p-2 text-white"
                    />
                  </div>
                  <div className="flex flex-col items-center ">
                    <label htmlFor="maxPrice">{t("maxPrice")}:</label>
                    <input
                      type="number"
                      placeholder={t("maxPrice")}
                      name="maxPrice"
                      id="maxPrice"
                      min="0"
                      max="99999999"
                      maxLength="8"
                      step="0.01"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({ ...filters, maxPrice: e.target.value })
                      }
                      className="border border-gray-300 w-3/4 rounded-md p-2 text-white"
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* KM */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("km")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex w-full gap-2 items-center text-black">
                  <div className="flex flex-col items-center text-center">
                    <label htmlFor="minKM">{t("minKM")}:</label>
                    <input
                      type="number"
                      placeholder={t("minKM")}
                      name="minKM"
                      id="minKM"
                      min="0"
                      max="999999"
                      maxLength="6"
                      value={filters.minKM}
                      onChange={(e) =>
                        setFilters({ ...filters, minKM: e.target.value })
                      }
                      className="border border-gray-300 w-3/4 rounded-md p-2 text-white"
                    />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <label htmlFor="maxKM">{t("maxKM")}:</label>
                    <input
                      type="number"
                      placeholder={t("maxKM")}
                      name="maxKM"
                      id="maxKM"
                      min="0"
                      max="999999"
                      maxLength="6"
                      value={filters.maxKM}
                      onChange={(e) =>
                        setFilters({ ...filters, maxKM: e.target.value })
                      }
                      className="border border-gray-300 w-3/4 rounded-md p-2 text-white"
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Mark*/}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("mark")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="mark">{t("mark")}:</label>
                  <input
                    type="text"
                    placeholder={t("mark")}
                    name="mark"
                    id="mark"
                    value={filters.mark}
                    maxLength="100"
                    pattern="[A-Za-z0-9\s\-]{2,}"
                    onChange={(e) =>
                      setFilters({ ...filters, mark: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Model*/}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("model")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="model">{t("model")}:</label>
                  <input
                    type="text"
                    placeholder={t("model")}
                    id="model"
                    name="model"
                    maxLength="100"
                    pattern="[A-Za-z0-9\s\-]{1,}"
                    value={filters.model}
                    onChange={(e) =>
                      setFilters({ ...filters, model: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* Year*/}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("year")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex w-full justify-between gap-2 text-black">
                  <div className="flex flex-col items-center">
                    <label htmlFor="since">{t("since")}:</label>
                    <input
                      type="number"
                      placeholder={t("since")}
                      id="since"
                      name="since"
                      min="1980"
                      value={filters.since}
                      max={new Date().getFullYear()}
                      onChange={(e) =>
                        setFilters({ ...filters, since: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <label htmlFor="to">{t("to")}:</label>
                    <input
                      type="number"
                      placeholder={t("to")}
                      id="to"
                      name="to"
                      min="1980"
                      value={filters.to}
                      max={new Date().getFullYear()}
                      onChange={(e) =>
                        setFilters({ ...filters, to: e.target.value })
                      }
                      className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                    />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/* Doors*/}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("doors")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="doors">{t("numDoors")}:</label>
                  <input
                    type="number"
                    placeholder={t("numDoors")}
                    id="doors"
                    name="doors"
                    min="2"
                    max="5"
                    value={filters.doors}
                    onChange={(e) =>
                      setFilters({ ...filters, doors: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  />
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/*Motor */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("motor")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="motor">{t("motor")}:</label>
                  <select
                    name="motor"
                    id="motor"
                    value={filters.motor}
                    onChange={(e) =>
                      setFilters({ ...filters, motor: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  >
                    <option value="">{t("select")}</option>
                    <option value="manual">{t("manual")}</option>
                    <option value="automatic">{t("automatic")}</option>
                  </select>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/*Location */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("location")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="location">{t("city")}:</label>
                  <select
                    name="location"
                    id="location"
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  >
                    <option value="">{t("select")}</option>
                    {cities.map((city, index) => (
                      <option key={index} value={city.city}>
                        {city.city}
                      </option>
                    ))}
                  </select>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/*Color */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                Color
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="color">{t("color")}:</label>
                  <select
                    name="color"
                    id="color"
                    value={filters.color}
                    onChange={(e) =>
                      setFilters({ ...filters, color: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  >
                    <option value="">{t("select")}</option>
                    <option value="Red">{t("red")}</option>
                    <option value="Blue">{t("blue")}</option>
                    <option value="White">{t("white")}</option>
                    <option value="Black">{t("black")}</option>
                    <option value="Orange">{t("orange")}</option>
                    <option value="Pink">{t("pink")}</option>
                    <option value="Yellow">{t("yellow")}</option>
                    <option value="Purple">{t("purple")}</option>
                    <option value="Gray">{t("gray")}</option>
                    <option value="Brown">{t("brown")}</option>
                  </select>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/*Bodywork */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("bodywork")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="bodywork">Bodywork:</label>
                  <select
                    name="bodywork"
                    id="bodywork"
                    value={filters.bodywork}
                    onChange={(e) =>
                      setFilters({ ...filters, bodywork: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  >
                    <option value="">{t("select")}</option>
                    <option value="Berlina">Berlina</option>
                    <option value="Familiar">Familiar</option>
                    <option value="Coupe">Coupe</option>
                    <option value="Monovolume">Monovolume</option>
                    <option value="SUV">SUV</option>
                    <option value="Cabrio">Cabrio</option>
                    <option value="PickUp">Pick Up</option>
                  </select>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        {/*fuel */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full bg-gray-700 justify-between items-center font-medium rounded-none">
                {t("fuel")}
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Disclosure.Button>

              <Disclosure.Panel className="px-3 pb-3 pt-3 bg-gray-400">
                <div className="flex flex-col w-full justify-center gap-2 text-black">
                  <label htmlFor="fuel">{t("fuel")}:</label>
                  <select
                    name="fuel"
                    id="fuel"
                    value={filters.fuel}
                    onChange={(e) =>
                      setFilters({ ...filters, fuel: e.target.value })
                    }
                    className="border w-3/4 border-gray-300 rounded-md p-2 text-white"
                  >
                    <option value="">Select one...</option>
                    <option value="Disel">{t("disel")}</option>
                    <option value="Gasoline">{t("gasoline")}</option>
                    <option value="Electric">{t("electric")}</option>
                    <option value="Hybrid">{t("hybrid")}</option>
                  </select>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/*Send button */}
        <Disclosure as="div" className="w-full border border-gray-800 p-0">
          <Disclosure.Button
            type="submit"
            className="w-full bg-gray-500 rounded-none"
          >
            {t("sendFilter")}
          </Disclosure.Button>
        </Disclosure>
      </form>
    </div>
  );
}
